import { useState } from 'react';
import { SubmitHandler, UseFormRegister, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { USERS } from 'services/apollo/gql/userQueries';
import { PollInput, User } from 'utils/types';

type UsePollFormHook = {
    defaultValues: PollInput | undefined
}

export type UsePollFormReturn = {
    register: UseFormRegister<PollInput>
    handleSubmit: (handler: SubmitHandler<PollInput>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: ReturnType<typeof useForm>['formState']['errors']
    loading: boolean
    error: any
    data: { users: User[] }
    emailList: string[]
    setEmailList: React.Dispatch<React.SetStateAction<string[]>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    systemUserSearch: string
    setSystemUserSearch: React.Dispatch<React.SetStateAction<string>>
    selectedSystemUsers: User[]
    setSelectedSystemUsers: React.Dispatch<React.SetStateAction<User[]>>
    pollAnswers: string[]
    setPollAnswers: React.Dispatch<React.SetStateAction<string[]>>
    newAnswer: string
    setNewAnswer: React.Dispatch<React.SetStateAction<string>>
}

export const usePollForm = ({ defaultValues }: UsePollFormHook): UsePollFormReturn => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
  const { data, loading, error } = useQuery(USERS);

  const [emailList, setEmailList] = useState<string[]>(defaultValues?.nonSystemUsersEmails || []);
  const [email, setEmail] = useState('');
  const [systemUserSearch, setSystemUserSearch] = useState('');
  const [selectedSystemUsers, setSelectedSystemUsers] = useState<User[]>([]);
  const [pollAnswers, setPollAnswers] = useState<string[]>([]);
  const [newAnswer, setNewAnswer] = useState('');

  return {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    data,
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