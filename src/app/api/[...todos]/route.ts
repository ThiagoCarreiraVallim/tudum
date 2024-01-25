import dbConnect from '@/data/dbConnect';
import Todo from '@/data/models/Todo';

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  const todos = await Todo.find({ userId: id });

  return Response.json(todos);
}

export async function POST(req: Request) {
  await dbConnect();

  const data = await req.json()
  const todo = await Todo.create(data);

  return Response.json(todo);
}

export async function PUT(req: Request) {
  await dbConnect();

  const data = await req.json()
  const todo = await Todo.findByIdAndUpdate(data._id, data, { new: true });

  return Response.json(todo);
}

export async function DELETE(req: Request) {
  await dbConnect();

  const data = await req.json()
  await Todo.findByIdAndDelete(data._id);

  return Response.json({ message: 'Todo deleted successfully'});
}