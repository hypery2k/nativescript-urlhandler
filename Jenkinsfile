properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

timeout(150) {
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

      stage('Build') {
        sh "cd publish && npm run setup-dev-env"
        sh "cd demo && rm -rf hooks/ node_modules/ platforms/ && npm i"
        sh "cd demo-angular && rm -rf hooks/ node_modules/ platforms/ && npm i"
      }

      stage('Webpack') {
        parallel demo: {
          sh "cd demo  && npm run build-ios-bundle && npm run build-android-bundle"
        }, demoAngular: {
          sh "cd demo-angular && npm run build-ios-bundle && npm run build-android-bundle"
        },
        failFast: true
      }

      stage('Test') {
        parallel unit:{
          sh "cd src && npm run test"
        }, iOS: {
          //sh "cd demo && npm run ci.ios.build && tns test ios --justlaunch --emulator"
        }, Android: {
          //sh "cd demo && npm run ci.android.build && tns test android --justlaunch --emulator"
        },
        failFast: true
        junit 'demo/target/junit-report/*.xml,src/target/junit-report/*.xml'
      }

      stage('Publish NPM snapshot') {
        def packageJSON = readJSON file: './src/package.json';
        sh "cd publish/package && mv *.tgz nativescript-urlhandler_v${packageJSON.version}-build${buildNumber}.tgz"
        archiveArtifacts artifacts: 'publish/package/*.tgz'
        nodeJS.publishSnapshot('src', buildNumber, branchName)
      }

    } catch (e) {
      mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
      throw e
    }
  }
}

