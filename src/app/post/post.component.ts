import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../services/content.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    currentUrl: string;
    public isPostRouter: boolean;

    constructor(private router: Router) {}

    ngOnInit() {
        // 获取当前路由 URL
        this.currentUrl = this.router.url;

        // 监听路由变化
        this.router.events.subscribe(() => {
            this.currentUrl = this.router.url;
        });

        // 判断 URL 是否符合模式
        this.isPostRouter = this.isUrlValid(this.currentUrl);
    }

    // 为了避免在 index 加载出来 html，使用以下判断，实际项目不适用此方法，最好单独创建一个 index 显示的 dto
    isUrlValid(url: string): boolean {
        // // 创建一个 URL 对象来解析路径
        // const urlObj = new URL(url, 'http://dummy'); // 'http://dummy' 是一个虚拟的基 URL

        // 提取路径部分
        // const path = urlObj.pathname;
        
        const firstSlashIndex = url.indexOf('/');

        if (firstSlashIndex === -1) return false;

        const path = url.substring(firstSlashIndex);

        // 定义正则表达式模式
        const pattern = /^\/blog\/[a-fA-F0-9\-]{36}\/([\w-]+)?$/;
        
        // 测试 URL 是否符合模式
        return pattern.test(path);
    }

    @Input()
    public post: Post;

    @Input()
    public withLink: boolean;
}
