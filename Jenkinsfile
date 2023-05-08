def dockerImage

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
		REGISTRY_URL = "registry.digitalocean.com/mirror"
		UPASS = credentials('digital-ocean')
	}

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
					dockerImage = docker.build("be-commerce:${env.BUILD_ID}")
				}
			}
		}
		stage('Push image') {
      steps {
				script {
					docker.withRegistry(env.REGISTRY_URL, env.UPASS, env.UPASS) {
						dockerImage.push()
					}
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
