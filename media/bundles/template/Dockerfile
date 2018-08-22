FROM teamcloudcv/origami:ub14.04-py2.7-cu8.0  

COPY . /app

RUN cd app && \
      pip install -r requirements.txt



ENTRYPOINT ["python", "main.py"]