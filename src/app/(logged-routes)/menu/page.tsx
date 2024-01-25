import NewTask from '@/components/Task/NewTask';
import TaskList from '@/components/Task/TaskList';

export default async function Menu() {

   return (
    <div className="flex flex-col items-center justify-between lg:p-24 p-5 h-screen">
      <div className={`bg-gray-200 md:w-full lg:w-2/3 flex flex-col items-center lg:p-10 p-3 pt-7 rounded-lg`}>
        <NewTask />
        <TaskList />
      </div>
    </div>
  );
}
