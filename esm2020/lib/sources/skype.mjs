import { AvatarSource } from './avatar-source.enum';
/**
 *  Skype source implementation.
 *  Fetch avatar source based on skype identifier
 */
export class Skype {
    constructor(sourceId) {
        this.sourceId = sourceId;
        this.sourceType = AvatarSource.SKYPE;
    }
    getAvatar() {
        return `https://api.skype.com/users/${this.sourceId}/profile/avatar`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2t5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtYXZhdGFyL3NyYy9saWIvc291cmNlcy9za3lwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLEtBQUs7SUFHaEIsWUFBbUIsUUFBZ0I7UUFBaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUYxQixlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFakIsQ0FBQztJQUVoQyxTQUFTO1FBQ2QsT0FBTywrQkFBK0IsSUFBSSxDQUFDLFFBQVEsaUJBQWlCLENBQUM7SUFDdkUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU291cmNlIH0gZnJvbSAnLi9zb3VyY2UnO1xuaW1wb3J0IHsgQXZhdGFyU291cmNlIH0gZnJvbSAnLi9hdmF0YXItc291cmNlLmVudW0nO1xuLyoqXG4gKiAgU2t5cGUgc291cmNlIGltcGxlbWVudGF0aW9uLlxuICogIEZldGNoIGF2YXRhciBzb3VyY2UgYmFzZWQgb24gc2t5cGUgaWRlbnRpZmllclxuICovXG5leHBvcnQgY2xhc3MgU2t5cGUgaW1wbGVtZW50cyBTb3VyY2Uge1xuICByZWFkb25seSBzb3VyY2VUeXBlOiBBdmF0YXJTb3VyY2UgPSBBdmF0YXJTb3VyY2UuU0tZUEU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUlkOiBzdHJpbmcpIHt9XG5cbiAgcHVibGljIGdldEF2YXRhcigpOiBzdHJpbmcge1xuICAgIHJldHVybiBgaHR0cHM6Ly9hcGkuc2t5cGUuY29tL3VzZXJzLyR7dGhpcy5zb3VyY2VJZH0vcHJvZmlsZS9hdmF0YXJgO1xuICB9XG59XG4iXX0=