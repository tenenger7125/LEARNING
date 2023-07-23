## fireEvent 와 user-event

### fireEvent

- 일반적인 이벤트를 사용할 때는 fireEvent를 사용
- 그러나 전부를 갖고 있지는 않음
- 또한, 사용자 관점이 아닌 DOM 관점에서 이벤트를 발생시키기 때문에 사용자 테스트에 적절하지 않음(스크린 리더가 안되는 경우)

### user-event

- 모든 이벤트를 사용할 수 있다.
- userEvent 객체의 이벤트 메서드는 무조건 Promise를 반환한다.
  - userEvent 객체의 이벤트 메서드를 사용하기 위해선 async-await 기법을 사용해야한다.
  ```js
  await user.click($button);
  ```
- 사용자 관점에서의 이벤트를 발생시키기 때문에 사용자 테스트에 적절하다.

#### 설치

```bash
npm install --save-dev @testing-library/user-event

```

#### import

```js
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
```

#### 참고

[user-event setup](https://testing-library.com/docs/user-event/setup)

---

<br/>

## screen 쿼리 메서드

- command[All]ByQueryType

### command

- get : DOM element => 없으면 에러 throw한다.
- query: NOT DOM element => 없으면 에러 throw가 아닌 null을 받고 싶을 때
- find : 비동기적으로 DOM element 나타날때

| Type of Query     | 0 Matches   | 1 Match        | >1 Matches   | Retry (Async/Await) |
| ----------------- | ----------- | -------------- | ------------ | ------------------- |
| getBy...          | Throw error | Return element | Throw error  | No                  |
| queryBy...        | Return null | Return element | Throw error  | No                  |
| findBy...         | Throw error | Return element | Throw error  | Yes                 |
| Multiple Elements |             |                |              |                     |
| getAllBy...       | Throw error | Return array   | Return array | No                  |
| queryAllBy...     | Return []   | Return array   | Return array | No                  |
| findAllBy...      | Throw error | Return array   | Return array | Yes                 |

### [All]

- 여러개 match할 때, All을 추가로 붙이면 배열 형태로 얻을 수 있다.

### QueryType

- Role : 가장 1순위
- AltText : 이미지
- Text : 화면에 표시되는 텍스트 요소
- Form elements의 경우
  - PlaceholderText
  - LabelText
  - DisplayValue

[⭐Query 메서드 관련 정보](https://testing-library.com/docs/queries/about)
[⭐비동기 메서드](https://testing-library.com/docs/dom-testing-library/api-async)
