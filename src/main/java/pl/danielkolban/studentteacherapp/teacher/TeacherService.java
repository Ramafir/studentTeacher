package pl.danielkolban.studentteacherapp.teacher;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.danielkolban.studentteacherapp.student.Student;
import pl.danielkolban.studentteacherapp.student.StudentRepository;
import pl.danielkolban.studentteacherapp.student.exceptions.DuplicateEmailException;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;


    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    List<Teacher> findByLastName(String lastName) {
        return teacherRepository.findAllByLastNameContainingIgnoreCase(lastName);
    }

    Optional<Teacher> findById(Long id) {
        return teacherRepository.findById(id);
    }

    public Teacher save(Teacher teacher) {
        Optional<Teacher> teacherByEmail = teacherRepository.selectExistsEmail(teacher.getEmail());
        teacherByEmail.ifPresent(t -> {
            throw new DuplicateEmailException();
        });
        return teacherRepository.save(teacher);
    }

    public Teacher update(Teacher teacher) {
        Optional<Teacher> userByEmail = teacherRepository.selectExistsEmail(teacher.getEmail());
        userByEmail.ifPresent(t -> {
            if(!t.getId().equals(teacher.getId()))
                throw new DuplicateEmailException();
        });
        return teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long teacherId) {
        if(!teacherRepository.existsById(teacherId)) {
            throw new TeacherNotFoundException();
        }
        teacherRepository.deleteById(teacherId);
    }


   public List<Student> getTeacherStudents(Long teacherId) {
        return teacherRepository.findById(teacherId)
                .map(Teacher::getStudents)
                .orElseThrow(TeacherNotFoundException::new);
    }

}
