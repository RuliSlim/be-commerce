def MY_IMAGE

pipeline {
	agent any
	stages {
		stage('SCM') {
			steps {
				checkout scm
			}
		}
		stage('Build Image') {
			steps {
				script {
					echo "${env}"
					MY_IMAGE = docker.build("be-commerce:${env.BUILD_ID}")
				}
			}
		}
		stage('Push image') {
      steps {
				script {
					echo "push image"
					// docker.withRegistry('https://268531535885.dkr.ecr.ap-southeast-1.amazonaws.com', "ecr:${AWS_DEFAULT_REGION}:aws-ecr") {
					// 		def customImage = docker.build("test:${env.BUILD_ID}")
					// 		/* Push the container to the custom Registry */
					// 		customImage.push()
					// }
				}
      }
    }
	}
}
