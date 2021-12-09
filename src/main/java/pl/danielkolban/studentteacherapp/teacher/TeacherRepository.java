package pl.danielkolban.studentteacherapp.teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.danielkolban.studentteacherapp.student.Student;

import java.util.List;
import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("" +
            "SELECT CASE WHEN COUNT(t) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Teacher t " +
            "WHERE t.email = ?1"
    )
    Optional<Teacher> selectExistsEmail(String email);

    List<Teacher> findAllByLastNameContainingIgnoreCase(String lastName);
}
