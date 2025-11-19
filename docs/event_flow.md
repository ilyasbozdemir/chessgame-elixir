# ChessRealtimeServer - Event Flow ve GenServer Yapısı

## 1. Katmanlar

- **GenServer**  
  - Oyun / masa / turnuva state ve logic’i  
  - Hamleleri işler, state’i günceller  
  - Opsiyonel: lobby / chat / presence state cache

- **Channel (ChessChannel)**  
  - Socket bağlantılarını yönetir  
  - Gelen event’i yakalar ve broadcast eder  
  - EventHandler aracılığıyla GenServer’a yönlendirir

- **DB (MongoDB)**  
  - Kalıcı veri (hamle geçmişi, chat log, turnuva sonuçları)

---

## 2. Event Flow Örneği

1. Client → ChessChannel.handle_in("table:player_join", payload)
2. ChessChannel → EventHandler (TableEventHandler.handle)
3. EventHandler → GenServer.cast({:player_joined, payload})
4. GenServer → State güncellenir, gerekirse DB’ye persist
5. GenServer → Channel.broadcast!(...) ile tüm client’lara update gider

---

## 3. Özet

- **Channel = iletişim köprüsü**  
- **GenServer = anlık state & logic**  
- **DB = kalıcı kayıt**  

