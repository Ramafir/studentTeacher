package pl.danielkolban.studentteacherapp.teacher;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No teacher with this ID")
public class TeacherNotFoundException extends RuntimeException{


}
