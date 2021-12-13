package pl.danielkolban.studentteacherapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import pl.danielkolban.studentteacherapp.student.FieldOfStudy;
import pl.danielkolban.studentteacherapp.student.Student;
import pl.danielkolban.studentteacherapp.student.StudentRepository;
import pl.danielkolban.studentteacherapp.teacher.Teacher;
import pl.danielkolban.studentteacherapp.teacher.TeacherRepository;

import java.util.ArrayList;
import java.util.Arrays;

import static pl.danielkolban.studentteacherapp.teacher.Subject.*;

@SpringBootApplication
public class StudentTeacherAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentTeacherAppApplication.class, args);
    }

    @Bean
    CommandLineRunner run(TeacherRepository teacherRepository, StudentRepository studentRepository) {
        return args -> {
            teacherRepository.save(new Teacher(null, "Paweł", "Gąbka", 43, "gąbek@edu.pl", JAVA, new ArrayList<>()));
            teacherRepository.save(new Teacher(null, "Mariusz", "Pudzianowski", 47, "pudzian@wp.pl", PYTHON, new ArrayList<>()));
            teacherRepository.save(new Teacher(null, "Grzegorz", "Skwara", 36, "skwarek@o2.pl", PYTHON, new ArrayList<>()));
            teacherRepository.save(new Teacher(null, "Paulo", "Sousa", 50, "yyyyyyyyyy@top.pt", JAVASCRIPT, new ArrayList<>()));
            studentRepository.save(new Student(null, "Tymoteusz", "Puchacz", 23, "puszka2115@sbm.pl", FieldOfStudy.LAW, new ArrayList<>()));
            studentRepository.save(new Student(null, "Matty", "Cash", 24, "cashyy@avfc.com", FieldOfStudy.MEDICINE, new ArrayList<>()));
            studentRepository.save(new Student(null, "Jakub", "Moder", 22, "modziu2115@sbm.pl", FieldOfStudy.IT, new ArrayList<>()));
        };
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4200"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Jwt-Token", "Authorization", "Origin, Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
