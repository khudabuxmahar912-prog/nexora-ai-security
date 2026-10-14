import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

from app.config import settings


class RateLimiter:
    """Simple in-memory limiter, one counter per IP address.

    use_forwarded=True reads the visitor IP from X-Forwarded-For, but only
    when TRUST_PROXY=true (the API runs behind our own website proxy).
    """

    def __init__(
        self, max_requests: int, window_seconds: int, use_forwarded: bool = False
    ):
        self.max_requests = max_requests
        self.window = window_seconds
        self.use_forwarded = use_forwarded
        self.hits: dict[str, deque[float]] = defaultdict(deque)

    def _ip(self, request: Request) -> str:
        if self.use_forwarded and settings.trust_proxy:
            first = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
            if first:
                return first[:64]
        return request.client.host if request.client else "unknown"

    def __call__(self, request: Request) -> None:
        if len(self.hits) > 10_000:
            self.hits.clear()
        ip = self._ip(request)
        now = time.monotonic()
        queue = self.hits[ip]
        while queue and now - queue[0] > self.window:
            queue.popleft()
        if len(queue) >= self.max_requests:
            raise HTTPException(
                status.HTTP_429_TOO_MANY_REQUESTS,
                "Too many requests. Please try again later.",
            )
        queue.append(now)