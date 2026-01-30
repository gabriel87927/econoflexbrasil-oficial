const PaymentIcons = () => {
  return (
    <div className="flex flex-col gap-2">
      {/* First row - All card brands + Boleto in single line */}
      <div className="flex items-center gap-1">
        {/* Visa */}
        <div className="bg-[#1A1F71] rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">VISA</span>
        </div>
        
        {/* Mastercard */}
        <div className="bg-[#1A1F71] rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 40 24" className="h-3 w-auto">
            <circle cx="14" cy="12" r="10" fill="#EB001B"/>
            <circle cx="26" cy="12" r="10" fill="#F79E1B"/>
            <path d="M20 5.3a10 10 0 0 0 0 13.4 10 10 0 0 0 0-13.4" fill="#FF5F00"/>
          </svg>
        </div>
        
        {/* American Express */}
        <div className="bg-[#006FCF] rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <span className="text-white text-[5px] font-bold leading-tight text-center">AMERICAN<br/>EXPRESS</span>
        </div>
        
        {/* Diners Club */}
        <div className="bg-white rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-3 w-3">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#004A97" strokeWidth="2"/>
            <path d="M8 7v10M16 7v10" stroke="#004A97" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Aura */}
        <div className="bg-[#0066B3] rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <span className="text-white text-[7px] font-bold">Aura</span>
        </div>
        
        {/* Elo */}
        <div className="bg-white rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <span className="text-[#231F20] text-[9px] font-bold italic">el<span className="text-[#FDB913]">o</span></span>
        </div>
        
        {/* Discover */}
        <div className="bg-white rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <span className="text-[#FF6600] text-[7px] font-bold">DISCOVER</span>
        </div>
        
        {/* Boleto */}
        <div className="bg-white rounded px-1 py-0.5 h-5 flex items-center justify-center">
          <div className="flex gap-[0.5px]">
            {[1.5, 1, 2, 1, 1.5, 1, 2, 1.5].map((w, i) => (
              <div key={i} className="bg-black h-3" style={{ width: `${w}px` }}></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Second row - Pix aligned left */}
      <div className="flex items-center">
        <div className="bg-white rounded px-1.5 py-0.5 h-5 flex items-center justify-center gap-0.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3">
            <path d="M12.5 2.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
            <path d="M12.5 12.1l4.2 4.2c.4.4.4 1 0 1.4l-4.2 4.2c-.4.4-1 .4-1.4 0l-4.2-4.2c-.4-.4-.4-1 0-1.4l4.2-4.2c.4-.4 1-.4 1.4 0z" fill="#32BCAD"/>
          </svg>
          <span className="text-[#32BCAD] text-[10px] font-light">pix</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentIcons;
