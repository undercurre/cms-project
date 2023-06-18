/*
 * @Author: undercurre undercurre@163.com
 * @Date: 2023-06-18 01:53:10
 * @LastEditors: undercurre undercurre@163.com
 * @LastEditTime: 2023-06-18 01:53:15
 * @FilePath: \cms-project\src\typings\express.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { User } from '../users/user.entity';

declare namespace Express {
  interface Request {
    user: User;
  }
}
