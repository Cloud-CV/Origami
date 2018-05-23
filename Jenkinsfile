pipeline {
    agent {
        docker {
         image 'fristonio/origami_base:0.1'
         args '-u root'
        }
    }
    environment { 
        HOST = 'localhost'
        PORT = '8000'
        DB_NAME = 'origami'
        DB_USER = 'origamiuser'
        DB_PASS = 'password'
        DB_USER_EMAIL = 'test@test.com'
        DB_HOST = 'localhost'
        REDIS_HOST = 'redis'
    }
    stages {
        stage('Build') {
            steps {
                sh 'jenkins/init.sh'
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
                echo "Finally deploying"
                // Add deployment step here
            }
        }
    }

    post {
        success {
            echo "Pipeline succeded"
            // Send notification to slack here
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