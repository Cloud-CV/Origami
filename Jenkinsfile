pipeline {
    agent {
        docker {
         image 'fristonio/origami_base:0.1'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'jenkins-ci/install-deps.sh'
                sh 'docker/postgres/init-user-db.sh'
                sh 'echo "This is the build step"'
                sh 'pip install -r requirements.txt'
                sh 'yarn install'
                sh 'yarn build'
                sh 'python manage.py makemigrations'
                sh 'python manage.py migrate'
            }
        }

        stage('Test') {
            steps {
                sh 'python manage.py test'
                sh 'yarn run test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'Finally deploying'
            }
        }
    }

    post {
        success {
            echo "Pipeline succeded"
            // Send notificatio to slack here
        }

        unstable {
            echo "Tests failed for pipeline"
            // Send notification to slack here
        }

        failure {
            echo "Pipeline failed"
            // Send notification to slack here
        }
    }
} 