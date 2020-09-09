import express from 'express';
import redis from 'async-redis';
import fetch from 'node-fetch';

import IUser from '../interfaces/user.interface';
import ITask from '../interfaces/task.interface';
import IPost from '../interfaces/post.interface';
import IComment from '../interfaces/comment.interface';

const API_LINK = 'https://jsonplaceholder.typicode.com';
const redisCli = redis.createClient(6379, 'redis');

redisCli.on('error', () => console.error);

type StringOrUndefined = string | undefined;

class GetData {
  async companiesData(req: express.Request, res: express.Response) {
    const companyName: StringOrUndefined = req.params.searchStr;
    const cacheKey: string = companyName || 'without_key';

    const savedData: any = await redisCli.get(cacheKey);

    if (savedData !== null) {
      console.log('saved data', savedData);
      return res.status(201).json(JSON.parse(savedData));
    }

    try {
      const usersResponse: any = await fetch(`${API_LINK}/users`);
      let users: IUser[] = await usersResponse.json();

      if (companyName) users = users.filter((users) => users.company.name.toLowerCase().includes(companyName.toLowerCase()));

      const taskResponse: any = await fetch(`${API_LINK}/todos?completed=true`);
      const tasks: ITask[] = await taskResponse.json();

      const usersMap: any = {};

      users.forEach((user) => {
        usersMap[user.id] = user;
      });

      tasks.forEach((task) => !!usersMap[task.userId] && (usersMap[task.userId]['tasksCount'] = (usersMap[task.userId]['tasksCount'] || 0) + 1));

      const companyNames: StringOrUndefined[] = [];
      Object.values(usersMap).forEach((user: any) => {
        if (user.tasksCount > 3) companyNames.push(user.company.name);
      });

      const uniqueCompanies = [...new Set(companyNames)];

      await redisCli.set(cacheKey, JSON.stringify(uniqueCompanies));
      return res.status(201).json(uniqueCompanies);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: 'Bad request' });
    }
  }

  async getUsersByPostCount(req: express.Request, res: express.Response) {
    try {
      const commentResponse: any = await fetch(`${API_LINK}/comments`);
      const comments: IComment[] = await commentResponse.json();

      const postResponse: any = await fetch(`${API_LINK}/posts`);
      let posts: IPost[] = await postResponse.json();

      const postsMap: any = {};
      posts.forEach((post) => (postsMap[post.id] = post));

      comments.forEach((comment) => (postsMap[comment.postId]['commentsCount'] = (postsMap[comment.postId]['commentsCount'] || 0) + 1));

      const usersPostCounts: any = {};
      Object.values(postsMap).forEach((post: any) => {
        if (post.commentsCount > 3) usersPostCounts[post.userId] = (usersPostCounts[post.userId] || 0) + 1;
      });

      const usersResponse: any = await fetch(`${API_LINK}/users`);
      const users: IUser[] = await usersResponse.json();

      const usersRes = users.map((user) => {
        if (usersPostCounts[user.id] > 2 && user.address.geo.lat && user.address.geo.lng) return { name: user.name, email: user.email };
      });

      return res.status(201).json(usersRes);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: 'Bad request' });
    }
  }

  async getUsersAndTasks(req: express.Request, res: express.Response) {
    try {
      const usersResponse: any = await fetch(`${API_LINK}/users`);
      let users: IUser[] = await usersResponse.json();

      const taskResponse: any = await fetch(`${API_LINK}/todos`);
      const tasks: ITask[] = await taskResponse.json();

      users.forEach((user) => {
        user.complatedTaskCount = tasks.filter((task) => task.userId === user.id).length;
      });

      return res.status(201).json(users);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: 'Bad request' });
    }
  }
}

export default new GetData();
