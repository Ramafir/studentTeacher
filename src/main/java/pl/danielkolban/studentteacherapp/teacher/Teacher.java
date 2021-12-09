package pl.danielkolban.studentteacherapp.teacher;

import lombok.*;
import pl.danielkolban.studentteacherapp.student.Student;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;
    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;
    @Size(min = 18, max = 100)
    private Integer age;
    @Column(nullable = false, unique = true)
    private String email;
    private Subject subject;
    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH},
            fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private List<Student> students = new ArrayList<>();

}