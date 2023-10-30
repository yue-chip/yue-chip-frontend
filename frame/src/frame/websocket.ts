export type Callback = (e: Event) => void
export type MessageCallback = (msg: any) => void

interface WebSocketOptions {
  url: string | null // 链接的通道的地址
  heartTime?: number // 心跳时间间隔
  heartMsg?: string // 心跳信息,默认为'ping'
  isReconnect?: boolean // 是否自动重连
  isDestory?: any // 是否销毁
  reconnectTime?: number // 重连时间间隔
  reconnectCount?: any // 重连次数 -1 则不限制
  openCb?: Callback // 连接成功的回调
  closeCb?: Callback // 关闭的回调
  messageCb?: MessageCallback // 消息的回调
  errorCb?: Callback // 错误的回调
}

export default class ReconWebSocket {
  ws!: WebSocket

  heartTimeOut!: number // 心跳计时器

  reconnectTimer:any = undefined // 重连计时器

  reconnectCount = 10 // 变量保存，防止丢失

  options: WebSocketOptions = {
    url: null, // 链接的通道的地址
    heartTime: 60000, // 心跳时间间隔
    heartMsg: 'ping', // 心跳信息,默认为'ping'
    isReconnect: true, // 是否自动重连
    isDestory: false, // 是否销毁
    reconnectTime: 5000, // 重连时间间隔
    reconnectCount: 5, // 重连次数 -1 则不限制
    openCb: (e: Event) => {
      console.log('连接成功的默认回调::::', e)
    }, // 连接成功的回调
    closeCb: (e: Event) => {
      console.log('关闭的默认回调::::', e)
    }, // 关闭的回调
    messageCb: (msg: any) => {
      console.log('接收消息的默认回调::::', msg)
    }, // 消息的回调
    errorCb: (e: Event) => {
      console.log('错误的默认回调::::', e)
    } // 错误的回调
  }

  constructor(ops: WebSocketOptions) {
    Object.assign(this.options, ops)
    this.create()
  }

  // 重置
  reset(): void {
    clearInterval(this.heartTimeOut)
  }

  /**
   * 启动心跳
   * @param {Function} cb 回调函数
   */
  start(cb: Callback): void {
    this.heartTimeOut = setInterval((e: Event) => {
      cb(e)
    }, this.options.heartTime)
  }

  /**
   * 建立连接
   */
  create(): void {
    if (!('WebSocket' in window)) {
      throw new Error('当前浏览器不支持WebSocket')
    }
    if (!this.options.url) {
      throw new Error('地址不存在，无法建立通道')
    }
    // this.ws = null
    this.ws = new WebSocket(this.options.url)
    this.onopen(this.options.openCb as Callback)
    this.onclose(this.options.closeCb as Callback)
    this.onmessage(this.options.messageCb as MessageCallback)
    this.onerror(this.options.errorCb as Callback)
  }

  /**
   * 自定义连接成功事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onopen(callback: Callback): void {
    this.ws.onopen = event => {
      clearTimeout(this.reconnectTimer) // 清除重连定时器
      this.options.reconnectCount = this.reconnectCount // 计数器重置
      // 建立心跳机制
      this.reset()
      this.start(() => {
        this.send(this.options.heartMsg as string)
      })
      if (typeof callback === 'function') {
        callback(event)
      } else if (typeof this.options.openCb === 'function') {
        this.options.openCb(event)
      }
    }
  }

  /**
   * 自定义关闭事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onclose(callback: Callback): void {
    this.ws.onclose = event => {
      this.reset()
      if (!this.options.isDestory) {
        this.onreconnect()
      }
      if (typeof callback === 'function') {
        callback(event)
      } else if (typeof this.options.closeCb === 'function') {
        this.options.closeCb(event)
      }
    }
  }

  /**
   * 自定义错误事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onerror(callback: Callback): void {
    this.ws.onerror = event => {
      if (typeof callback === 'function') {
        callback(event)
      } else if (typeof this.options.errorCb === 'function') {
        this.options.errorCb(event)
      }
    }
  }

  /**
   * 自定义消息监听事件
   * 如果callback存在，调用callback，不存在调用OPTIONS中的回调
   * @param {Function} callback 回调函数
   */
  onmessage(callback: MessageCallback): void {
    this.ws.onmessage = (event: MessageEvent<string>) => {
      const strMessage = event.data
      if (typeof callback === 'function') {
        callback(strMessage)
      } else if (typeof this.options.messageCb === 'function') {
        this.options.messageCb(strMessage)
      }
      // 收到任何消息，重新开始倒计时心跳检测
      this.reset()
      this.start(() => {
        this.send(this.options.heartMsg as string)
      })
    }
  }

  /**
   * 自定义发送消息事件
   * @param {any} data 发送的内容
   */
  send(data: any): void {
    if (this.ws.readyState !== this.ws.OPEN) {
      throw new Error('WebSocket没有连接，无法发送')
    }
    this.ws.send(data)
  }

  /**
   * 连接事件
   */
  onreconnect(): void {
    if ((this.options.reconnectCount as number) > 0 || this.options.reconnectCount === -1) {
      this.reconnectTimer = setTimeout(() => {
        this.create()
        if (this.options.reconnectCount !== -1) {
          this.options.reconnectCount -= 1
        }
      }, this.options.reconnectTime)
    } else {
      clearTimeout(this.reconnectTimer)
      this.options.reconnectCount = this.reconnectCount
    }
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.reset()
    clearTimeout(this.reconnectTimer) // 清除重连定时器
    this.options.isDestory = true
    this.ws.close()
  }

  isDestory(): boolean {
    return this.options.isDestory
  }

  isOpen(): boolean {
    return this.ws.readyState == this.ws.OPEN
  }
}

