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
		REGISTRY_URL = "registry.digitalocean.com"
		UPASS = credentials('digital-ocean')
	}

	def gitCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
	def dockerTag = "${env.REGISTRY_URL}/mirror/be-commerce:${gitCommit}"
	
	stages {
		stage('SCM') {
			steps {
				checkout scm
			}
		}
		stage('Build Image') {
			steps {
				script {
					dockerImage = docker.build "${dockerTag}"
				}
			}
		}
		stage('Push image') {
      steps {
				script {
					sh "docker login registry.digitalocean.com -u ${env.UPASS} -p ${env.UPASS}"
					sh "docker push ${dockerTag}"
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
		always {
			sh "docker rmi ${dockerTag}"
			sh "docker logout ${env.REGISTRY_URL}"
		}
  }
}
