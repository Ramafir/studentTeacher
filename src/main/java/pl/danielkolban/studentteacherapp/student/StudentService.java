package pl.danielkolban.studentteacherapp.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.danielkolban.studentteacherapp.student.exceptions.BadRequestException;
import pl.danielkolban.studentteacherapp.student.exceptions.DuplicateEmailException;
import pl.danielkolban.studentteacherapp.student.exceptions.StudentNotFoundException;
import pl.danielkolban.studentteacherapp.teacher.Teacher;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    List<Student> findByLastName(String lastName) {
        return studentRepository.findAllByLastNameContainingIgnoreCase(lastName);
    }

    Optional<Student> findById(Long id) {
        return studentRepository.findById(id);
    }

    public Student save(Student student) {
        Optional<Student> studentByEmail = studentRepository.selectExistsEmail(student.getEmail());
       studentByEmail.ifPresent(u -> {
            throw new DuplicateEmailException();
        });
        return studentRepository.save(student);
    }

    public Student update(Student student) {
        Optional<Student> userByEmail = studentRepository.selectExistsEmail(student.getEmail());
        userByEmail.ifPresent(s -> {
            if(!s.getId().equals(student.getId()))
                throw new DuplicateEmailException();
        });
        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException();
        }
        studentRepository.deleteById(studentId);
    }


    List<Teacher> getStudentTeachers(Long studentId) {
        return studentRepository.findById(studentId)
                .map(Student::getTeachers)
                .orElseThrow(StudentNotFoundException::new);
    }
}
