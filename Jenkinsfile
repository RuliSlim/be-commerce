def MY_IMAGE

def getCommitSha() {
  sh "git rev-parse HEAD > .git/current-commit"
  return readFile(".git/current-commit").trim()
}

def getRepoURL() {
	sh "git config --get remote.origin.url > .git/remote-url"
	return readFile(".git/remote-url").trim()
}

void setBuildStatus(String message, String state) {

	repoUrl = getRepoURL()
  commitSha = getCommitSha()

  step([
      $class: "GitHubCommitStatusSetter",
    	reposSource: [$class: "ManuallyEnteredRepositorySource", url: repoUrl],
			commitShaSource: [$class: "ManuallyEnteredShaSource", sha: commitSha],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
	agent any

	environment {
		DIGITALOCEAN_ACCESS_TOKEN=credentials('doctl')
	}

	stages {
		stage('SCM') {
			steps {
				checkout scm
			}
		}
		stage('Install Doctl') {
			steps {
				sh 'doctl sls install'
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
		stage('Connect Doctl') {
			steps {
				sh 'doctl sls connect'
			}
		}
		stage('Push image') {
      steps {
				script {
					echo "push image"
					echo 'CHECK WORKID'
					sh 'ls'
					echo '==================='
					// docker.withRegistry('https://268531535885.dkr.ecr.ap-southeast-1.amazonaws.com', "ecr:${AWS_DEFAULT_REGION}:aws-ecr") {
					// 		def customImage = docker.build("test:${env.BUILD_ID}")
					// 		/* Push the container to the custom Registry */
					// 		customImage.push()
					// }
				}
      }
    }
	}

  post {
    success {
        setBuildStatus("Build succeeded", "SUCCESS");
    }
    failure {
        setBuildStatus("Build failed", "FAILURE");
    }
  }
}
