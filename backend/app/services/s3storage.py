from contextlib import asynccontextmanager

from aiobotocore.session import get_session
from botocore.exceptions import ClientError

from app.core.config import settings


class S3Client:
    def __init__(
            self,
            access_key: str,
            secret_key: str,
            endpoint_url: str,
            bucket_name: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url,
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    async def upload_file(
            self,
            upload_file: bytes,
            object_name: str
    ):
        file_content = upload_file
        try:
            async with self.get_client() as client:
                await client.put_object(
                    Bucket=self.bucket_name,
                    Key=object_name,
                    Body=file_content,
                )
                print(f"File {object_name} uploaded to {self.bucket_name}")
            return object_name
        except ClientError as e:
            print(f"Error uploading file: {e}")

    async def get_file_info(self, object_name: str):
        try:
            async with self.get_client() as client:
                result = await client.get_object_acl(
                    Bucket=self.bucket_name,
                    Key=object_name
                )
                print(f"File: {result}")
        except ClientError as e:
            print(f"Error getting info about file: {e}")

    async def get_file_url(self, object_name: str, expiration: int = 3600):
        try:
            async with self.get_client() as client:
                result = await client.generate_presigned_url(
                    'get_object',
                    Params={'Bucket': self.bucket_name, 'Key': object_name},
                    ExpiresIn=expiration
                )
                print(f"File url: {result}")
        except ClientError as e:
            print(f"Error getting info about file: {e}")

    async def delete_file(self, object_name: str):
        try:
            async with self.get_client() as client:
                await client.delete_object(
                    Bucket=self.bucket_name,
                    Key=object_name
                )
                print(f"File {object_name} deleted from {self.bucket_name}")
        except ClientError as e:
            print(f"Error deleting file: {e}")

    async def get_file(self, object_name: str):
        try:
            async with self.get_client() as client:
                response = await client.get_object(
                    Bucket=self.bucket_name,
                    Key=object_name
                )
                data = await response["Body"].read()
                return data
        except ClientError as e:
            print(f"Error downloading file: {e}")


s3_client = S3Client(
    access_key=settings.ACCESS_KEY,
    secret_key=settings.SECRET_KEY,
    endpoint_url=settings.ENDPOINT_URL,
    bucket_name=settings.BUCKET_NAME,
)
