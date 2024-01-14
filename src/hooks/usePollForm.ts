import { useState } from 'react';
import { Control, SubmitHandler, UseFormRegister, UseFormSetValue, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { USERS } from 'services/apollo/gql/userQueries';
import { PollAnswerData, PollData, User } from 'utils/types';

type UsePollFormHook = {
    defaultValues: PollData | undefined
}

export type UsePollFormReturn = {
    control: Control<PollData, any>
    setValue: UseFormSetValue<PollData>
    register: UseFormRegister<PollData>
    handleSubmit: (handler: SubmitHandler<PollData>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: ReturnType<typeof useForm>['formState']['errors']
    loading: boolean
    error: any
    userData: { users: User[] }
    emailList: string[]
    setEmailList: React.Dispatch<React.SetStateAction<string[]>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    systemUserSearch: string
    setSystemUserSearch: React.Dispatch<React.SetStateAction<string>>
    selectedSystemUsers: User[]
    setSelectedSystemUsers: React.Dispatch<React.SetStateAction<User[]>>
    pollAnswers: PollAnswerData[]
    setPollAnswers: React.Dispatch<React.SetStateAction<PollAnswerData[]>>
    newAnswer: string
    setNewAnswer: React.Dispatch<React.SetStateAction<string>>
}

export const usePollForm = ({ defaultValues }: UsePollFormHook): UsePollFormReturn => {
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({ defaultValues });
  const { data: userData, loading, error } = useQuery(USERS);

  const [emailList, setEmailList] = useState<string[]>(defaultValues?.nonSystemUsersEmails || []);
  const [email, setEmail] = useState('');
  const [systemUserSearch, setSystemUserSearch] = useState('');
  const [selectedSystemUsers, setSelectedSystemUsers] = useState<User[]>([]);
  const [pollAnswers, setPollAnswers] = useState<PollAnswerData[]>([]);
  const [newAnswer, setNewAnswer] = useState('');

  return {
    control,
    setValue,
    register,
    handleSubmit,
    errors,
    loading,
    error,
    userData,
    emailList,
    setEmailList,
    email,
    setEmail,
    systemUserSearch,
    setSystemUserSearch,
    selectedSystemUsers,
    setSelectedSystemUsers,
    pollAnswers,
    setPollAnswers,
    newAnswer,
    setNewAnswer
  };
};