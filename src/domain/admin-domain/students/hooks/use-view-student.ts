import { useGetStudentQuery } from '../api/student.api';
import { useGetClassesQuery } from '../../classes/api/class-api';

interface UseViewStudentProps {
  studentId: number;
}

export function useViewStudent({ studentId }: UseViewStudentProps) {
  const { data, isLoading, isError } = useGetStudentQuery({ id: studentId });
  const { data: classesData } = useGetClassesQuery();
  return { data, isLoading, isError, classesData };
}
