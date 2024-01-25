import NewTaskForm from './NewTaskForm';

export default async function NewTask() {
  
  return (
      <div className={`flex rounded-lg shadow-sm w-4/6 mb-9`}>
        <NewTaskForm />
      </div>
  )
}