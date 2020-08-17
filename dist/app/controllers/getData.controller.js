"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_redis_1 = __importDefault(require("async-redis"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const API_LINK = 'https://jsonplaceholder.typicode.com';
const redisCli = async_redis_1.default.createClient(6379, 'redis');
redisCli.on("error", () => console.error);
class GetData {
    async companiesData(req, res) {
        const companyName = req.params.searchStr;
        const cacheKey = companyName || 'without_key';
        const savedData = await redisCli.get(cacheKey);
        if (savedData !== null) {
            console.log('saved data', savedData);
            return res.status(201).json(JSON.parse(savedData));
        }
        try {
            const usersResponse = await node_fetch_1.default(`${API_LINK}/users`);
            let users = await usersResponse.json();
            if (companyName)
                users = users.filter(users => users.company.name.toLowerCase().includes(companyName.toLowerCase()));
            const taskResponse = await node_fetch_1.default(`${API_LINK}/todos?completed=true`);
            const tasks = await taskResponse.json();
            const usersMap = {};
            users.forEach(user => {
                usersMap[user.id] = user;
            });
            tasks.forEach(task => !!usersMap[task.userId] &&
                (usersMap[task.userId]['tasksCount'] = (usersMap[task.userId]['tasksCount'] || 0) + 1));
            const companyNames = [];
            Object.values(usersMap).forEach((user) => {
                if (user.tasksCount > 3)
                    companyNames.push(user.company.name);
            });
            const uniqueCompanies = [...new Set(companyNames)];
            await redisCli.set(cacheKey, JSON.stringify(uniqueCompanies));
            return res.status(201).json(uniqueCompanies);
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Bad request" });
        }
    }
    async getUsersByPostCount(req, res) {
        try {
            const commentResponse = await node_fetch_1.default(`${API_LINK}/comments`);
            const comments = await commentResponse.json();
            const postResponse = await node_fetch_1.default(`${API_LINK}/posts`);
            let posts = await postResponse.json();
            const postsMap = {};
            posts.forEach(post => postsMap[post.id] = post);
            comments.forEach(comment => postsMap[comment.postId]['commentsCount'] = (postsMap[comment.postId]['commentsCount'] || 0) + 1);
            const usersPostCounts = {};
            Object.values(postsMap).forEach((post) => {
                if (post.commentsCount > 3)
                    usersPostCounts[post.userId] = (usersPostCounts[post.userId] || 0) + 1;
            });
            const usersResponse = await node_fetch_1.default(`${API_LINK}/users`);
            const users = await usersResponse.json();
            const usersRes = users.map(user => {
                if (usersPostCounts[user.id] > 2 && user.address.geo.lat && user.address.geo.lng)
                    return { name: user.name, email: user.email };
            });
            return res.status(201).json(usersRes);
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Bad request" });
        }
    }
    async getUsersAndTasks(req, res) {
        try {
            const usersResponse = await node_fetch_1.default(`${API_LINK}/users`);
            let users = await usersResponse.json();
            const taskResponse = await node_fetch_1.default(`${API_LINK}/todos`);
            const tasks = await taskResponse.json();
            users.forEach(user => {
                user.complatedTaskCount = tasks.filter(task => task.userId === user.id).length;
            });
            return res.status(201).json(users);
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: "Bad request" });
        }
    }
}
exports.default = new GetData();
