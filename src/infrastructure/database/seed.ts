import { DataSource } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { Post } from '../../domain/entities/post.entity';
import { Comment } from '../../domain/entities/comment.entity';
import { Like } from '../../domain/entities/like.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestdb',
  entities: [User, Post, Comment, Like],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);

  const user = userRepo.create({ name: 'John Doe' });
  await userRepo.save(user);

  const post = postRepo.create({ content: 'Hello World!', user });
  await postRepo.save(post);

  console.log('Seed completed');
  process.exit(0);
}

seed();
