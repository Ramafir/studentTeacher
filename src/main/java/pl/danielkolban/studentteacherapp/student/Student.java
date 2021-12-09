package pl.danielkolban.studentteacherapp.student;

import lombok.*;
import pl.danielkolban.studentteacherapp.teacher.Teacher;

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
public class Student {
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
    private FieldOfStudy fieldOfStudy;
    @ManyToMany(mappedBy = "students")
    private List<Teacher> teachers = new ArrayList<>();

}
