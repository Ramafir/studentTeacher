package pl.danielkolban.studentteacherapp.student.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No student with this ID")
public class StudentNotFoundException extends RuntimeException{

}
