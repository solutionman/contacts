
systemctl start postgresql

gradle clean build

java -jar build/libs/contacts-0.0.1-SNAPSHOT.jar

http://localhost:8080

./gradlew bootRun


