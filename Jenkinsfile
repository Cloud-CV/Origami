pipeline {
	 agent any
	 stages {
	 	stage('Build') {
			       steps {
			       	     sh 'echo "This is the build step"'
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