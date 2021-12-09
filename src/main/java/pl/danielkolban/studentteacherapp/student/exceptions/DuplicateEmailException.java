package pl.danielkolban.studentteacherapp.student.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Student with this email already exist")
public class DuplicateEmailException extends RuntimeException { }
