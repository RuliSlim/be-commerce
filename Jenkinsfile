def CURRENT_STAGE

pipeline {
	agent any

	stages {
		stage('SCM') {
			steps {
				// node ('master') {
				// 	checkout scm
				// }
				// script {
				// 	CURRENT_STAGE=env.STAGE_NAME
				// }
			}
		}
		stage('Build image') {   
      steps {
        // node ('master') {    
        //   script {       
        //     CURRENT_STAGE=env.STAGE_NAME
        //     app = docker.build("${IMAGE_PREFIX}") 
        //   }   
        // }
      }
    }
		stage('Push image') {
      steps {
        node ('master') {
					withEnv (["AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID}", "AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY}", "AWS_DEFAULT_REGION=${env.AWS_DEFAULT_REGION}"]) {
						sh 'dokcer login -u AWS -p $(aws ecr get-login-password --region ap-southeast-1) 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com'
						sh 'docker build -t rulislim .'
						sh 'docker tag rulislim:latest 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
						sh 'docker push 268531535885.dkr.ecr.ap-southeast-1.amazonaws.com/rulislim:""$BUILD_ID""'
					}
        }
      }
    }
	}
}
