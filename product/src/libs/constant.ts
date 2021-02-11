export const enum Priority {
    Low = '낮음',
    Medium = '보통',
    High = '높음',
}

export const priorityInitialValue = Priority.Medium

export const priorityLabels = [Priority.Low, Priority.Medium, Priority.High]

export const enum Visibility {
    Visible = '보이기',
    Hidden = '감추기',
}

export const visibilityInitialValue = Visibility.Visible

export const visibilityLabels = [Visibility.Visible, Visibility.Hidden]

export const enum Order {
    Created = '등록일',
    Deadline = '마감 기한',
    Priority = '우선순위',
}

export const orderInitialValue = Order.Created

export const orderLabels = [Order.Created, Order.Deadline, Order.Priority]
