import random

from origami_lib.origami import Origami


app = Origami("VisualDialog")


def process_question(answer, message=""):
    print("Question from the user is : {}".format(message))

    random_answers = ["olleh", "dlrow", "oof", "rab"]
    ans = random.choice(random_answers)

    return ans 


@app.listen()
@app.origami_api
def inference():
    '''
    Returns:
        answer: Answer for the given question and image
    '''

    # This method does not process the image and question.
    # Please add your model related code here to complete the
    # inference pipeline.

    random_answers = ["yes","no","maybe"]
    answer = random.choice(random_answers)

    ans_arr = [answer]
    app.register_persistent_connection(process_question, [ans_arr])

    # returns the answer
    return answer


app.run()
