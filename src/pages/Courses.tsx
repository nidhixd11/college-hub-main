import { useState } from 'react';
import { Plus, Search, BookOpen, Users, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockCourses } from '@/data/mockData';
import { Course } from '@/types';

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Computer Science': 'bg-primary/10 text-primary border-primary/20',
      'Electrical Engineering': 'bg-warning/10 text-warning border-warning/20',
      'Mechanical Engineering': 'bg-success/10 text-success border-success/20',
      'Business Administration': 'bg-info/10 text-info border-info/20',
    };
    return colors[department] || 'bg-muted text-muted-foreground border-muted';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage course catalog and curriculum
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button variant="gradient" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course in the catalog.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input id="code" placeholder="CS101" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input id="credits" type="number" placeholder="3" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="Introduction to Programming" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Computer Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" placeholder="Dr. John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Course description..." rows={3} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gradient">
                  Add Course
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="animate-slide-up">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses by title, code, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <Card
            key={course.id}
            variant="interactive"
            className="animate-slide-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
            onClick={() => setSelectedCourse(course)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getDepartmentColor(course.department)}`}>
                  {course.code}
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
              </div>
              <CardTitle className="text-lg mt-3">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.credits} Credits
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {course.department}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm">
                  <span className="text-muted-foreground">Instructor: </span>
                  <span className="font-medium">{course.instructor}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-lg">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <DialogTitle>{selectedCourse.title}</DialogTitle>
                    <DialogDescription>{selectedCourse.code}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                  <p className="text-sm">{selectedCourse.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Department</h4>
                    <p className="text-sm font-medium">{selectedCourse.department}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Credits</h4>
                    <p className="text-sm font-medium">{selectedCourse.credits}</p>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Instructor</h4>
                    <p className="text-sm font-medium">{selectedCourse.instructor}</p>
                  </div>
                </div>
                {selectedCourse.syllabusUrl && (
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Syllabus
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
