def CURRENT_STAGE
@Library('github.com/releaseworks/jenkinslib') _

pipeline {
	agent any

	environment {
		AWS_DEFAULT_REGION="ap-southeast-1"
	}

	stages {
		stage('SCM') {
			steps {
				checkout scm
			}
		}
		stage('Push image') {
      steps {
				withCredentials ([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-ecr', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
					// sh '''
					// 	AWS --version
					// 	AWS ec2 describe-instances
					// '''
					
					// sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-southeast-1) 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com'
					// sh 'docker build -t rulislim .'
					// sh 'docker tag rulislim:latest 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
					// sh 'docker push 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
				}
				docker.withRegistry('268531535885.dkr.ecr.ap-southeast-1.amazonaws.com', 'aws-ecr') {
						def customImage = docker.build("test:${env.BUILD_ID}")
						/* Push the container to the custom Registry */
						customImage.push()
				}
      }
    }
	}
}
