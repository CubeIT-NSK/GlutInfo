FROM python:3.11

WORKDIR /app

COPY Makefile .

COPY requirements.txt .

RUN make requirements

COPY . .

CMD ["make", "run"]







# COPY ./requirements.txt /backend/requirements.txt

# RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

# # 
# COPY ./app /backend/app

# # 
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]