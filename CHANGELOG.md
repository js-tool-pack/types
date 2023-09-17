# [0.1.0](https://github.com/js-tool-pack/types/compare/v0.0.9...v0.1.0) (2023-09-17)

### Features

- **object:** 新增 FlattenIntersection 扁平化交叉类型 ([fb73e94](https://github.com/js-tool-pack/types/commit/fb73e94c53c814548f8fd9f47c5f7bd6b8606df0))
- **object:** 新增 Mix 混合类型 ([3319847](https://github.com/js-tool-pack/types/commit/331984738d18f586e0dc338a3cc7804fb21ea458))

## [0.0.9](https://github.com/js-tool-pack/types/compare/v0.0.8...v0.0.9) (2023-09-12)

### Bug Fixes

- **object:** 修复 exactOptionalPropertyTypes 会影响 ConvertOptionalPart 和 ConvertOptional 结果的问题 ([de1c623](https://github.com/js-tool-pack/types/commit/de1c62388b594370676cdad9528e99d3903ae005))

## [0.0.8](https://github.com/js-tool-pack/types/compare/v0.0.7...v0.0.8) (2023-09-12)

### Features

- **object:** 新增 ConvertOptional，转换对象中所有可选属性为必选，并且原值类型加上`| undefined` ([81ae3cb](https://github.com/js-tool-pack/types/commit/81ae3cb9dd9901941e46e186a19d48bfa748b10a))
- **object:** 新增 ConvertOptionalPart，转换对象中部分可选属性为必选，并且原值类型加上`| undefined` ([311912b](https://github.com/js-tool-pack/types/commit/311912be745a9d1d4411a8d3195c9d088c8be293))

### Performance Improvements

- **object:** 简化 ConvertOptional ([2cd6a52](https://github.com/js-tool-pack/types/commit/2cd6a529a749240b6e437bfa61a8c1f8540492a9))

## [0.0.7](https://github.com/js-tool-pack/types/compare/v0.0.6...v0.0.7) (2023-08-28)

### Features

- **utils:** 新增 FN 函数 ([7d0fc87](https://github.com/js-tool-pack/types/commit/7d0fc873d8d5389a462accea58ec5a233d191cf2))

## [0.0.6](https://github.com/js-tool-pack/types/compare/v0.0.5...v0.0.6) (2023-06-27)

### Features

- **object:** 新增 TupleToObj，把元组转为对象 ([6389a7b](https://github.com/js-tool-pack/types/commit/6389a7bab18a909fa8d8beb37f0e1208d0310d2d))

## [0.0.5](https://github.com/js-tool-pack/types/compare/v0.0.4...v0.0.5) (2023-06-20)

### Features

- **object:** 新增 PartialPart，把一个对象选中的 key 从 Required 改为 Partial ([3cc859d](https://github.com/js-tool-pack/types/commit/3cc859d99d72b4a416a5f8409b236f23b6813808))

## [0.0.4](https://github.com/js-tool-pack/types/compare/v0.0.3...v0.0.4) (2023-06-20)

### Features

- **object:** 新增 RequiredPart，把一个对象选中的 key 从 Partial 改为 Required ([a80d007](https://github.com/js-tool-pack/types/commit/a80d0073e6469e52e4eaaee5e684837c19cade91))

## [0.0.3](https://github.com/js-tool-pack/types/compare/v0.0.2...v0.0.3) (2023-06-18)

### Features

- `Point` ([62c6a8c](https://github.com/js-tool-pack/types/commit/62c6a8c05c0f0e9b5e82f8fbddc8bb99b3466590))

## [0.0.2](https://github.com/js-tool-pack/types/compare/v0.0.1...v0.0.2) (2023-04-01)

### Bug Fixes

- noEmit ([8692650](https://github.com/js-tool-pack/types/commit/86926501e456be67d9c45fa03bc3be8060d9e53f))

### Features

- `StrRepeat` ([3694b02](https://github.com/js-tool-pack/types/commit/3694b029cd142324def6704dcc19f3efa83ffc6e))
- **object-path:** `PathUnion` ([506e865](https://github.com/js-tool-pack/types/commit/506e8654ed7bc13fbc317c3c11732599f17e1c3c))
- **object:** `DeepReadonly` ([9a7eb73](https://github.com/js-tool-pack/types/commit/9a7eb73e3aa731ae2c73c69b9107c852ff461bb4))
- **utils:** `AntiBool` ([3ee7407](https://github.com/js-tool-pack/types/commit/3ee7407b97275a1c8ae1defa66d5ed6a7e21c7e2))
- **verify:** `IsAny` ([b44d97c](https://github.com/js-tool-pack/types/commit/b44d97c00f8bced2928b234431b1b5518dd5a798))
- **verify:** `IsUnion` ([83e2a6e](https://github.com/js-tool-pack/types/commit/83e2a6e41c7d14528d6793b6b86360b551e4cf17))
- **verify:** `IsUnknown` ([9afd713](https://github.com/js-tool-pack/types/commit/9afd713f652829d4f92fb7c56d2819b97decf90d))

### Performance Improvements

- **verify:** `IsAny` ([f8ae048](https://github.com/js-tool-pack/types/commit/f8ae048d4d47155189a646136c7651038c2ae003))

## 0.0.1 (2022-11-30)

## [0.0.7](https://github.com/js-tool-pack/types/compare/v0.0.6...v0.0.7) (2023-08-28)

### Features

- **utils:** 新增 FN 函数 ([7d0fc87](https://github.com/js-tool-pack/types/commit/7d0fc873d8d5389a462accea58ec5a233d191cf2))

## [0.0.6](https://github.com/js-tool-pack/types/compare/v0.0.5...v0.0.6) (2023-06-27)

### Features

- **object:** 新增 TupleToObj，把元组转为对象 ([6389a7b](https://github.com/js-tool-pack/types/commit/6389a7bab18a909fa8d8beb37f0e1208d0310d2d))

## [0.0.5](https://github.com/js-tool-pack/types/compare/v0.0.4...v0.0.5) (2023-06-20)

### Features

- **object:** 新增 PartialPart，把一个对象选中的 key 从 Required 改为 Partial ([3cc859d](https://github.com/js-tool-pack/types/commit/3cc859d99d72b4a416a5f8409b236f23b6813808))

## [0.0.4](https://github.com/js-tool-pack/types/compare/v0.0.3...v0.0.4) (2023-06-20)

### Features

- **object:** 新增 RequiredPart，把一个对象选中的 key 从 Partial 改为 Required ([a80d007](https://github.com/js-tool-pack/types/commit/a80d0073e6469e52e4eaaee5e684837c19cade91))

## [0.0.3](https://github.com/js-tool-pack/types/compare/v0.0.2...v0.0.3) (2023-06-18)

### Features

- `Point` ([62c6a8c](https://github.com/js-tool-pack/types/commit/62c6a8c05c0f0e9b5e82f8fbddc8bb99b3466590))

## [0.0.2](https://github.com/js-tool-pack/types/compare/v0.0.1...v0.0.2) (2023-04-01)

### Bug Fixes

- noEmit ([8692650](https://github.com/js-tool-pack/types/commit/86926501e456be67d9c45fa03bc3be8060d9e53f))

### Features

- `StrRepeat` ([3694b02](https://github.com/js-tool-pack/types/commit/3694b029cd142324def6704dcc19f3efa83ffc6e))
- **object-path:** `PathUnion` ([506e865](https://github.com/js-tool-pack/types/commit/506e8654ed7bc13fbc317c3c11732599f17e1c3c))
- **object:** `DeepReadonly` ([9a7eb73](https://github.com/js-tool-pack/types/commit/9a7eb73e3aa731ae2c73c69b9107c852ff461bb4))
- **utils:** `AntiBool` ([3ee7407](https://github.com/js-tool-pack/types/commit/3ee7407b97275a1c8ae1defa66d5ed6a7e21c7e2))
- **verify:** `IsAny` ([b44d97c](https://github.com/js-tool-pack/types/commit/b44d97c00f8bced2928b234431b1b5518dd5a798))
- **verify:** `IsUnion` ([83e2a6e](https://github.com/js-tool-pack/types/commit/83e2a6e41c7d14528d6793b6b86360b551e4cf17))
- **verify:** `IsUnknown` ([9afd713](https://github.com/js-tool-pack/types/commit/9afd713f652829d4f92fb7c56d2819b97decf90d))

### Performance Improvements

- **verify:** `IsAny` ([f8ae048](https://github.com/js-tool-pack/types/commit/f8ae048d4d47155189a646136c7651038c2ae003))

## 0.0.1 (2022-11-30)

## [0.0.6](https://github.com/js-tool-pack/types/compare/v0.0.5...v0.0.6) (2023-06-27)

### Features

- **object:** 新增 TupleToObj，把元组转为对象 ([6389a7b](https://github.com/js-tool-pack/types/commit/6389a7bab18a909fa8d8beb37f0e1208d0310d2d))

## [0.0.5](https://github.com/js-tool-pack/types/compare/v0.0.4...v0.0.5) (2023-06-20)

### Features

- **object:** 新增 PartialPart，把一个对象选中的 key 从 Required 改为 Partial ([3cc859d](https://github.com/js-tool-pack/types/commit/3cc859d99d72b4a416a5f8409b236f23b6813808))

## [0.0.4](https://github.com/js-tool-pack/types/compare/v0.0.3...v0.0.4) (2023-06-20)

### Features

- **object:** 新增 RequiredPart，把一个对象选中的 key 从 Partial 改为 Required ([a80d007](https://github.com/js-tool-pack/types/commit/a80d0073e6469e52e4eaaee5e684837c19cade91))

## [0.0.3](https://github.com/js-tool-pack/types/compare/v0.0.2...v0.0.3) (2023-06-18)

### Features

- `Point` ([62c6a8c](https://github.com/js-tool-pack/types/commit/62c6a8c05c0f0e9b5e82f8fbddc8bb99b3466590))

## [0.0.2](https://github.com/js-tool-pack/types/compare/v0.0.1...v0.0.2) (2023-04-01)

### Bug Fixes

- noEmit ([8692650](https://github.com/js-tool-pack/types/commit/86926501e456be67d9c45fa03bc3be8060d9e53f))

### Features

- `StrRepeat` ([3694b02](https://github.com/js-tool-pack/types/commit/3694b029cd142324def6704dcc19f3efa83ffc6e))
- **object-path:** `PathUnion` ([506e865](https://github.com/js-tool-pack/types/commit/506e8654ed7bc13fbc317c3c11732599f17e1c3c))
- **object:** `DeepReadonly` ([9a7eb73](https://github.com/js-tool-pack/types/commit/9a7eb73e3aa731ae2c73c69b9107c852ff461bb4))
- **utils:** `AntiBool` ([3ee7407](https://github.com/js-tool-pack/types/commit/3ee7407b97275a1c8ae1defa66d5ed6a7e21c7e2))
- **verify:** `IsAny` ([b44d97c](https://github.com/js-tool-pack/types/commit/b44d97c00f8bced2928b234431b1b5518dd5a798))
- **verify:** `IsUnion` ([83e2a6e](https://github.com/js-tool-pack/types/commit/83e2a6e41c7d14528d6793b6b86360b551e4cf17))
- **verify:** `IsUnknown` ([9afd713](https://github.com/js-tool-pack/types/commit/9afd713f652829d4f92fb7c56d2819b97decf90d))

### Performance Improvements

- **verify:** `IsAny` ([f8ae048](https://github.com/js-tool-pack/types/commit/f8ae048d4d47155189a646136c7651038c2ae003))

## 0.0.1 (2022-11-30)

## [0.0.5](https://github.com/js-tool-pack/types/compare/v0.0.4...v0.0.5) (2023-06-20)

### Features

- **object:** 新增 PartialPart，把一个对象选中的 key 从 Required 改为 Partial ([3cc859d](https://github.com/js-tool-pack/types/commit/3cc859d99d72b4a416a5f8409b236f23b6813808))

## [0.0.4](https://github.com/js-tool-pack/types/compare/v0.0.3...v0.0.4) (2023-06-20)

### Features

- **object:** 新增 RequiredPart，把一个对象选中的 key 从 Partial 改为 Required ([a80d007](https://github.com/js-tool-pack/types/commit/a80d0073e6469e52e4eaaee5e684837c19cade91))

## [0.0.3](https://github.com/js-tool-pack/types/compare/v0.0.2...v0.0.3) (2023-06-18)

### Features

- `Point` ([62c6a8c](https://github.com/js-tool-pack/types/commit/62c6a8c05c0f0e9b5e82f8fbddc8bb99b3466590))

## [0.0.2](https://github.com/js-tool-pack/types/compare/v0.0.1...v0.0.2) (2023-04-01)

### Bug Fixes

- noEmit ([8692650](https://github.com/js-tool-pack/types/commit/86926501e456be67d9c45fa03bc3be8060d9e53f))

### Features

- `StrRepeat` ([3694b02](https://github.com/js-tool-pack/types/commit/3694b029cd142324def6704dcc19f3efa83ffc6e))
- **object-path:** `PathUnion` ([506e865](https://github.com/js-tool-pack/types/commit/506e8654ed7bc13fbc317c3c11732599f17e1c3c))
- **object:** `DeepReadonly` ([9a7eb73](https://github.com/js-tool-pack/types/commit/9a7eb73e3aa731ae2c73c69b9107c852ff461bb4))
- **utils:** `AntiBool` ([3ee7407](https://github.com/js-tool-pack/types/commit/3ee7407b97275a1c8ae1defa66d5ed6a7e21c7e2))
- **verify:** `IsAny` ([b44d97c](https://github.com/js-tool-pack/types/commit/b44d97c00f8bced2928b234431b1b5518dd5a798))
- **verify:** `IsUnion` ([83e2a6e](https://github.com/js-tool-pack/types/commit/83e2a6e41c7d14528d6793b6b86360b551e4cf17))
- **verify:** `IsUnknown` ([9afd713](https://github.com/js-tool-pack/types/commit/9afd713f652829d4f92fb7c56d2819b97decf90d))

### Performance Improvements

- **verify:** `IsAny` ([f8ae048](https://github.com/js-tool-pack/types/commit/f8ae048d4d47155189a646136c7651038c2ae003))

## 0.0.1 (2022-11-30)
