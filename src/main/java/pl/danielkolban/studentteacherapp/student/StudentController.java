package pl.danielkolban.studentteacherapp.student;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.danielkolban.studentteacherapp.teacher.Teacher;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("")
    public List<Student> findAll(@RequestParam(required = false) String lastName) {
        if(lastName != null)
            return studentService.findByLastName(lastName);
        else
            return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findById(@PathVariable Long id) {
        return studentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/teachers")
    public List<Teacher> getStudentTeachers(@PathVariable Long id) {
        return studentService.getStudentTeachers(id);
    }

    @PostMapping("")
    public ResponseEntity<Student> save(@RequestBody Student student) {
        if(student.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saved object cannot have id set");
        Student savedUser = studentService.save(student);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        if(!id.equals(student.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The updated object must have an id that matches the id in the resource path");
        Student updatedStudent = studentService.update(student);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable("id") Long id) {
        studentService.deleteStudent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
