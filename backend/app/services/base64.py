import base64


async def filebase64_decode(obj: str) -> bytes:
    print(obj)
    file = base64.b64decode(obj)
    return file


async def file_encodebase64(obj):
    base64_str = base64.b64encode(obj)
    return base64_str
