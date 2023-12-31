# Jest

## 단언(Assertions)

- jest의 전역 객체인 expect로 시작한다.
  - 인수로는 예측에 들어맞는지 확인하는 것을 넣는다.
- jest-dom에서 matcher가 붙는다.

  - 인수가 필요한 것도 있고 없는 것도 있다.

- 시작은 expect로 시작한다.

- toBe(string) : `===`
- expect(elementArray).toHaveLength(number) : `===`

- jest-dom은 CRA할 때 같이 설치된다.
- `setupTests.js`가 jest-dom을 import하기 때문에, 모든 테스트에서 jest-dom 매처를 사용할 수 있다.

## Jest가 필요한 이유

- 컴포넌트를 가상 DOM으로 렌더링할 때 도움이 된다.
- 가상 DOM을 검색할 때 도움이 된다.
- 가상 DOM과 상호작용하여, 요소를 클릭하거나 요소를 찾는다.

## 시작방법

```bash
npm test # watch 모드 자동
```

- watch 모드는 마지막 커밋상태에서 현재 모든 파일의 변경된 파일과 연관된 테스트를 진행한다.

## 전역 test 메서드

- 첫번째 인수는 문자열 세부 묘사를 작성하고
- 두번째는 함수를 작성한다.
  - 테스트 함수를 실행하여 에러가 발생하거나 통과한다.
  - 단언이 실패할 경우 에러를 던진다.
  - 에러가 없으면 통과한다.
    - 고의로 throw를 작성하면 실패로 나타난다.

## TDD : 테스트 주도 개발

- 코드 작성 전에 테스트를 작성하고
- 테스트에 통과하도록 코드를 작성하는 것
- 흔히, 레드,그린 테스트라고 한다.
  - 코드 작성전에 테스트에 실패하는 코드를 작성하고
  - 코드 작성후에는 통과하는 코드를 작성한다.
- 빈 함수 => 테스트 코드 => 실패 => 함수 작성 => 통과

### 왜 TDD를 사용하나

- 테스트를 작성하는 것이 따분한 일이 아닌, 코딩 프로세스에 필요한 것이다.
- 원하는지 동작하는지 확인하는 효율적인 방법이다.
  - 수동이 아닌, 자동으로 하기 떄문에
  - 개발하면서 모든 테스트 코드를 작성하면, 변경 사항이 발생하더라도 걱정이 없어진다.

## RTL의 역할은 무엇일까?

- RTL은 가상 돔을 생성
  - 가상 돔으로 상호작용(클릭, ) => 브라우저 없이 가능

### 유닛 테스트

- 코드의 한 부분만 테스트
- 다른 코드와 연관 X

### 통합 테스트

- 여러 유닛이 동작을 테스트한다.
- - 다른 코드와 연관 O

### 기능 테스트

- 소프트웨어의 특정 기능을 테스트
- 동작을 테스트하는 것이다.
- JEST는 기능 테스트를 권장한다.

### E2E 테스트

- 실제 브라우저가 필요하고, 서버가 필요하다.
- Cypress나 Seleniumn과 같은 라이브러리가 필요하다.

## 기능 테스트와 유닛 테스트 장단점

### 유닛 테스트

- 독립성
- 테스트가 실패하면, 어디를 확인해야하는지 정확히 알수 있다.
- 그러나 사용자의 상호작용과 먼 테스트이기 때문에, 실제 동작과 다를 수도 있다.
- 리팩토링으로 실패할 가능성이 있다.

### 기능 테스트

- 유저 Flow와 유닛 테스트가 연관
- 사용자가 소프트웨어와 연관성이 있다. 테스트 성공과 실패는 사용자의 성공과 실패와 연관
- 동작만 동일하다면 테스트 통과하는데 견고하다
- 실패한 테스트를 디버깅하기 어렵다.

## BDD와 TDD 차이

### TDD : 테스트주도개발

- 오직 개발자간 상호작용

### BDD : 행동주도개발

- 개발자, QA, 사업가간 서로 다른 그룹이 상호작용

## 테스팅 라이브러리의 접급성과 요소 찾기

- 스크린 리더와 같은 보조 기술로 찾는 것을 권장
- 사용할 쿼리에 대한 문서도 있다.

1. getByRole
2. getByLabelText
3. getByPlaceholderText (input 관련)
4. getByText (디스플레이와 관련 X)
5. getByDisplayValue (form 관련)

---

1. getByAltText(이미지 관련)
2. getByTitle(타이틀 관련)

---

1. getByTestId : 최후의 수단
