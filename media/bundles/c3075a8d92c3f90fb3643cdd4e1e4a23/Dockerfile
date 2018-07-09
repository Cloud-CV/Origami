FROM teamcloudcv/origami:ub14.04-py3.5-cu7.0

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN /bin/bash setup.sh

ENTRYPOINT ["python", "main.py"]