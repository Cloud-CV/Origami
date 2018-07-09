from origami_lib.origami import Origami


app = Origami("VisualDialog")


@app.listen()
@app.origami_api
def inference(image, question, **kwargs):
    '''
    Arguments:
        image: Input image for VQA Demo
        question: Input question for VQA demo
    Returns:
        answer: Answer for the given question and image
    '''

    # This method does not process the image and question.
    # Please add your model related code here to complete the
    # inference pipeline.

    import random
    random_answers = ["hello", "world", "foo", "bar"]
    answer = random.choice(random_answers)
    app.send_text_array()

    # returns the answer
    return answer


app.run()