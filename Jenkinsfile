pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vivekkumarvodnala/LostAndFound.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t vivekvodnala/lostfound-backend:${BUILD_NUMBER} .
                    '''
                }
            }
        }

        stage('Push Backend Image') {
            steps {
                sh '''
                docker push vivekvodnala/lostfound-backend:${BUILD_NUMBER}
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh '''
                    docker build -t vivekvodnala/lostfound-frontend:${BUILD_NUMBER} .
                    '''
                }
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh '''
                docker push vivekvodnala/lostfound-frontend:${BUILD_NUMBER}
                '''
            }
        }
    }
}