properties properties: [
        [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
        disableConcurrentBuilds()
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

timeout(60) {
    node('nativescript') {
        def buildNumber = env.BUILD_NUMBER
        def branchName = env.BRANCH_NAME
        def workspace = env.WORKSPACE
        def buildUrl = env.BUILD_URL

        // PRINT ENVIRONMENT TO JOB
        echo "workspace directory is $workspace"
        echo "build URL is $buildUrl"
        echo "build Number is $buildNumber"
        echo "branch name is $branchName"
        echo "PATH is $env.PATH"

        try {
            stage('Checkout') {
                checkout scm
            }

            dir('src') {
                stage('Build') {
                    sh "npm run clean && npm run build"
                }

                stage('Test') {
                    sh "npm run test"
                    junit 'target/junit-report/junitresults-*.xml'
                }
            }

            stage('End2End Test') {
                sh "cd demo && npm run build.plugin && npm i && npm run build-ios-bundle && npm run build-android-bundle"
                sh "cd demo-angular && npm run build.plugin && npm i && npm run build-ios-bundle && npm run build-android-bundle"
            }

            stage('Publish NPM snapshot') {
                sh "npm run build"
                nodeJS.publishSnapshot('src', buildNumber, branchName)
            }

        } catch (e) {
            mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
            throw e
        }
    }
}

