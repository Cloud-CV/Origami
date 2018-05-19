pipeline {
	 agent {
	     docker {
	         image 'fristonio/origami_base:0.1'  
	     }
	 }
	 stages {
	 	stage('Build') {
			       steps {
			       	     sh 'echo "This is the build step"'
				     sh 'node --version'
				     sh 'yarn --version'
				     sh 'python -V'
			       }
		}

	 	stage('Test') {
			      steps {
			      	    sh 'echo "This test will pass!"; exit 0;'
			      }
		}
	 }

	 post {
	      success {
	      	     echo "Pipeline succeded"
	      }

	      unstable {
	      	       echo "Tests failed for pipeline"
	      }

	      failure {
	      	      echo "Pipeline failed"
	      }
	 }
} 