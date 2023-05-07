def CURRENT_STAGE

pipeline {
	agent any

	environment {
		AWS_DEFAULT_REGION="ap-southeast-1"
		// THE_BUTLER_SAYS_SO=credentials('aws-ecr') // you can use this rather withCredentials
	}

	stages {
		stage('SCM') {
			steps {
				checkout scm
				// 	CURRENT_STAGE=env.STAGE_NAME
				// node ('master') {
				// }
				// script {
				// }
			}
		}
		// stage('Build image') {   
    //   steps {
    //     // node ('master') {    
    //     //   script {       
    //     //     CURRENT_STAGE=env.STAGE_NAME
    //     //     app = docker.build("${IMAGE_PREFIX}") 
    //     //   }   
    //     // }
    //   }
    // }
		stage('Push image') {
      steps {
				withCredentials ([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-ecr', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
					sh '''
						aws --version
						aws ec2 describe-instances
					'''
					
					// sh 'docker login -u AWS -p $(aws ecr get-login-password --region ap-southeast-1) 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com'
					// sh 'docker build -t rulislim .'
					// sh 'docker tag rulislim:latest 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
					// sh 'docker push 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
				}
      }
    }
	}
}
